## Compiling

`vr start` will compile all Markdown files and copy the `content` folder.

## Deploying

The following environment variables are required:

```powershell
$env:MV_SITE_AWS_PROFILE = 'default';
$env:MV_SITE_AWS_S3_BUCKET = '';
$env:MV_SITE_AWS_CF_DISTRIB_ID = '';
```