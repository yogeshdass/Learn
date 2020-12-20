//Import the Amazon EC2 service client
const EC2 = require('aws-sdk/clients/ec2');
//set region and apiversion and Create Service Object
let reg = "us-east-1"; // use process.argv
let ec2 = new EC2({
    apiVersion: '2016-11-15',
    region: `${reg}`
});
let azs = [];
let cb = "10.10.0.0"; // use process.argv
let cidrsubnets = [];

tf = {};
tf.terraform = {};

let t = tf.terraform;
t.backend = {};
t.provider = {};
t.resource = {};
t.output = {};

t.backend.s3 = {
    "bucket": "y-tfstate-bucket",
    "key": "VPC/terraform.tfstate",
    "region": `${reg} `
}

t.provider.aws = {
    "region": `${reg} `
}

let r = t.resource;
r.aws_vpc = {};
r.aws_subnet = {};
r.aws_internet_gateway = {};
r.aws_eip = {};
r.aws_nat_gateway = {};
r.aws_route_table = {};
r.aws_main_route_table_association = {};
r.aws_route_table_association = {};
r.aws_security_group = {};
r.aws_security_group_rule = {};

let vpc = r.aws_vpc;
vpc.default = {
    "cidr_block": `${cb}/16`,
    "enable_dns_support": "true",
    "enable_dns_hostnames": "true"
}
vpc.default.tags = {
    "Name": `${reg}-${cb}`
}
let subnet = r.aws_subnet;

ec2.describeAvailabilityZones((err, data) => {
    return new Promise((resolve, reject) => {
        if (err) {
            return reject(err);
        } else {
            resolve(data);
        }
    });
}).promise().then(azes => {

    for (let i = 0; i < azes.AvailabilityZones.length; i++) {
        azs[i] = azes.AvailabilityZones[i].ZoneName;
    }
    let subnetazs = [];
    for (let j = azs.length; subnetazs.length < 6; j++) {
        subnetazs = subnetazs.concat(azs);
    }

    if (cb.match("10.10.0.0")) {
        for (let i = 0, v = 1; i < azs.length; i++ , v++) {
            cidrsubnets[i] = `10.10.${v}0.0/23`;
        }
    } else if (cb.match("10.0.0.0")) {
        for (let i = 0, v = 1; i < azs.length; i++ , v++) {
            cidrsubnets[i] = `10.0.${v}.0/24`;
        }
    } else {
        console.log("Please Choose Between the Two");
    }

    for (let s = 0, set_subnet_type = "Private"; s < azs.length; s++) {

        if (s >= 3) {
            set_subnet_type = "Public";
        }

        subnet[s] = {
            "vpc_id": "${aws_vpc.default.id}",
            "cidr_block": cidrsubnets[s],
            "availability_zone": subnetazs[s]
        };
        let sliced = cidrsubnets[s].slice(0, 10);
        subnet[s].tags = {
            "Name": `${subnetazs[s]}-${sliced}-${set_subnet_type}`
        };
    }

    r.aws_internet_gateway.igw = {};
    r.aws_internet_gateway.igw.vpc_id = "${aws_vpc.default.id}";
    r.aws_internet_gateway.igw.vpc_id.tags = { "Name": "Default igw" };

    r.aws_eip.neip = {};
    r.aws_eip.neip.vpc = "true";
    r.aws_eip.neip.tags = { "Name": "EIP for NGW" };

    r.aws_nat_gateway.ngw = {
        "allocation_id": "${aws_eip.neip.id}",
        "subnet_id": "${aws_subnet.PuS1.id}",
        "depends_on": [
            "aws_internet_gateway.igw"
        ]
    };
    r.aws_nat_gateway.ngw.tags = { "Name": "Default ngw in Public Subnet" };

    r.aws_route_table.PublicRt = {};
    r.aws_route_table.PublicRt.vpc_id = "${aws_vpc.default.id}";
    r.aws_route_table.PublicRt.route = {
        "cidr_block": "0.0.0.0/0",
        "gateway_id": "${aws_internet_gateway.igw.id}"
    };
    r.aws_route_table.PublicRt.tags = {
        "Name": "Public Route Table"
    };

    r.aws_route_table.PrivateRt = {};
    r.aws_route_table.PrivateRt.vpc_id = "${aws_vpc.default.id}";
    r.aws_route_table.PrivateRt.route = {
        "cidr_block": "0.0.0.0/0",
        "gateway_id": "${aws_nat_gateway.ngw.id}"
    };
    r.aws_route_table.PrivateRt.tags = {
        "Name": "Private Route Table"
    };

    let prettyjson = JSON.stringify(tf, null, 2);
    console.log(prettyjson);
    /*const {
    writeFileSync
} = require('fs');
writeFileSync('./test/template.tf.json', prettyjson);
//run terraform init
const {
    exec
} = require('child_process');
exec('cd ./test; terraform init; terraform plan', (err, sout, serr) => {
    if (err) {
        //one way to refer vars
        console.error(`exec error: ${err}`);
        return
    }
    //other way to refer vars
    console.log("Result:" + sout);
});*/
}).catch((err) => {
    console.error(err);
});