package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"path/filepath"
	"os"
	"strings"
)

// Pod struct data type to represent each pod
type Pod struct {
	Name   string `json:"name,omitempty"`
	HostIP string `json:"hostIP,omitempty"`
	Phase  string `phase:"type,omitempty"`
}

func main() {
	
	res, err := http.Get("https://k8s-alpha-podhistory.org.in/api/v1/podstatus")
	if err != nil {
		panic(err)
	}
	defer res.Body.Close()

	// Read the payload
	body, err := ioutil.ReadAll(res.Body)

	if err != nil {
		panic(err)
	}

	if res.Status == "200 OK" {
		var pods []Pod
		livePods := make([]string, 1, 4)
		excludeFiles := []string{"rundate", "log", "current", "bz2", "gz", "zip"}

		err = json.Unmarshal(body, &pods)

		if err != nil {
			panic(err)
		}

		for _, pod := range pods {
			if pod.Phase == "Running" {
				livePods = append(livePods, pod.Name)
			}
		}

		allPods, err := ioutil.ReadDir("/home/yogesh_24901/wa-prod")
		if err != nil {
			panic(err)
		}

		for _, podDir := range allPods {
			if contains(livePods, podDir.Name()) {
				fmt.Println(podDir.Name(), " is Live")
				fmt.Println(filterFiles("/home/yogesh_24901/wa-prod", excludeFiles))
			} else {
				fmt.Println(podDir.Name(), " is DEAD")
				fmt.Println(filterFiles("/home/yogesh_24901/wa-prod", []string{"bz2", "gz", "zip"}))
			}
		}
	} else {
		fmt.Println(res.Status)
		fmt.Println("Cant proceed Dude")
	}
}

func contains(s []string, e string) bool {
    for _, a := range s {
        if a == e {
            return true
        }
    }
    return false
}

func findFiles(root string) ([]string) {
    var files []string
    err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
        if !info.IsDir() {
            files = append(files, path)
        }
        return nil
	})
	
	if err != nil {
        panic(err)
	}
	
    return files
}

func filterFiles(root string, el []string) ([]string) {
	var files []string
	filesToCompress := findFiles(root)
	for _, fname := range filesToCompress {
		if !isExluded(fname, el) {
			files = append(files, fname)
		}
	}
	return files
}

func isExluded(e string,s []string) bool {
	for _, suffix := range s {
		if strings.HasSuffix(e, suffix) {
			return true
		}
	}
	return false
}
