terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "4.27.0"
    }
  }

  backend "s3" {
    bucket = "inf-management"
    key    = "qrgopass/common-io-dynamodb"
    region = "us-east-2"
    iam_endpoint = "http://localstack:4566"
    sts_endpoint = "http://localstack:4566"
    endpoint = "http://localstack:4566"
    dynamodb_endpoint = "http://localstack:4566"
    force_path_style = true
  }
}

provider "aws" {
  region = "us-east-2"
  s3_use_path_style           = true
  skip_credentials_validation = true
  skip_metadata_api_check     = true
  skip_requesting_account_id  = true

  endpoints {
    apigateway     = "http://localstack:4566"
    cloudformation = "http://localstack:4566"
    cloudwatch     = "http://localstack:4566"
    dynamodb       = "http://localstack:4566"
    es             = "http://localstack:4566"
    firehose       = "http://localstack:4566"
    iam            = "http://localstack:4566"
    kinesis        = "http://localstack:4566"
    lambda         = "http://localstack:4566"
    route53        = "http://localstack:4566"
    redshift       = "http://localstack:4566"
    s3             = "http://localstack:4566"
    secretsmanager = "http://localstack:4566"
    ses            = "http://localstack:4566"
    sns            = "http://localstack:4566"
    sqs            = "http://localstack:4566"
    ssm            = "http://localstack:4566"
    stepfunctions  = "http://localstack:4566"
    sts            = "http://localstack:4566"
  }
}

module "main" {
  source = "../"

  environment = basename(abspath(path.root))
}