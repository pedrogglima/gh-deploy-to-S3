# How to deploy manually

Use the command for checking if terraform files are correct:

    terraform plan

Use the command for applying changes on terraform files:

    terraform apply

Using AWS cli, we can upload the public folder running the command on project's root directory:

    aws s3 sync public s3://$YOUR_DOMAIN
