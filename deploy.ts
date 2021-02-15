async function executeCommand(cmd: string[] | string) {
  if (typeof cmd === "string") {
    cmd = cmd.split(" ");
  }

  const p = Deno.run({ cmd, stderr: "piped", stdout: "piped" });

  const [status, stdoutBytes, stderrBytes] = await Promise.all([
    p.status(),
    p.output(),
    p.stderrOutput(),
  ]);
  p.close();

  const stdout = new TextDecoder("utf-8").decode(stdoutBytes);
  const stderror = new TextDecoder("utf-8").decode(stderrBytes);

  return {
    status,
    stdout,
    stderror,
  };
}

/**
 * @private Does a deleting sync to the S3 bucket.
 * @returns {Promise<void>}
 */
async function s3Sync(
  awsProfile: string | undefined,
  localDirPath: string,
  s3BucketName: string | undefined,
) {
  const response = await executeCommand([
    `aws s3 sync`,
    localDirPath,
    `s3://${s3BucketName}`,
    `--profile ${awsProfile}`,
    `--delete`,
    `--acl public-read`,
  ].join(" "));
  if (response.status.success) {
    console.log("S3 sync complete!");
  } else {
    console.error(`S3 sync error: ${response.stderror}`);
  }
}

/**
 * @private Invalidated the CloudFront cache.
 * @param {string} distributionId
 * @returns {Promise<void>}
 */
async function cloudfrontInvalidate(
  awsProfile: string | undefined,
  distributionId: string | undefined,
) {
  const response = await executeCommand([
    `aws cloudfront create-invalidation`,
    `--profile ${awsProfile}`,
    `--distribution-id ${distributionId}`,
    `--paths /*`,
  ].join(" "));
  if (response.status.success) {
    console.log("CloudFormation invalidation complete!");
  } else {
    console.error(`CloudFormation invalidation error: ${response.stderror}`);
  }
}

await s3Sync(
  Deno.env.get("MV_SITE_AWS_PROFILE"),
  "dist",
  Deno.env.get("MV_SITE_AWS_S3_BUCKET"),
);
await cloudfrontInvalidate(
  Deno.env.get("MV_SITE_AWS_PROFILE"),
  Deno.env.get("MV_SITE_AWS_CF_DISTRIB_ID"),
);
