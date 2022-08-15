variable "aws_region" {
  type = string
}

variable "domain_name" {
  type = string
}

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.25.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

module "website" {
  source      = "./static-site"
  domain_name = var.domain_name
}
