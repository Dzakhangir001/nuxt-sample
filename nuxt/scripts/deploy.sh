npm run generate;
aws s3 cp dist s3://staging.fazeclan.com --recursive;
echo "done";
