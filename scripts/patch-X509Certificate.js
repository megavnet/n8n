const fs = require('fs');
const glob = require('glob');

// process.chdir(__dirname + '/..');

const files = [
  'node_modules/@n8n_io/license-sdk/dist/LicenseManager.js',
  'node_modules/@n8n_io/license-sdk/dist/LicenseManager.mjs'
];

files.forEach(replaceAll);

function replaceAll(filePath) {
  // /usr/local/lib/node_modules/n8n/node_modules/@n8n_io/license-sdk/dist/LicenseManager.mjs
  // /usr/local/lib/node_modules/n8n/node_modules/@n8n_io/license-sdk/dist/LicenseManager.js
  if (fs.existsSync(filePath)) {
    console.log(`Patching ${filePath}`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const newFileContent = fileContent.replace(
      /X509Certificate\(`([^`]+)`\)/g,
      `X509Certificate\(\`-----BEGIN CERTIFICATE-----
MIIDtTCCAp0CFDy6uD07eX2/rK4FVKjBZcZMUvawMA0GCSqGSIb3DQEBCwUAMIGW
MQswCQYDVQQGEwJWTjEPMA0GA1UECAwGSGEgTm9pMQ8wDQYDVQQHDAZIYSBOb2kx
ITAfBgNVBAoMGEludGVybmV0IFdpZGdpdHMgUHR5IEx0ZDEQMA4GA1UECwwHc2Vj
dGlvbjEPMA0GA1UEAwwGTWVnYVZOMR8wHQYJKoZIhvcNAQkBFhBhZG1pbkBtZWdh
dm4ubmV0MB4XDTI0MDEyNjAzNTAzN1oXDTI1MDEyNTAzNTAzN1owgZYxCzAJBgNV
BAYTAlZOMQ8wDQYDVQQIDAZIYSBOb2kxDzANBgNVBAcMBkhhIE5vaTEhMB8GA1UE
CgwYSW50ZXJuZXQgV2lkZ2l0cyBQdHkgTHRkMRAwDgYDVQQLDAdzZWN0aW9uMQ8w
DQYDVQQDDAZNZWdhVk4xHzAdBgkqhkiG9w0BCQEWEGFkbWluQG1lZ2F2bi5uZXQw
ggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCq7+ofmFy9fOHs/lzI+I/o
4rm26BbLkUQNEMSL+YZUk5QO+kuZ+O4+UuwEZBlms709V81Bb5U9YrwZjegl3lMe
2DtjTA86CL5eCXEB2gJ9TsNJz3GODgmyIkWbm1+A+Ue3/00+8SRvk1tmVk2Gecfm
+jXrS8xYH8Xa2H1Pw20ScgN0aZSSx2rxm62x4yMON+waZxpnmOg4y0ueDU1++Qbk
W/4B9l58joC8Kq6m323G+Z0Nq0WbTEgbXpwR09xeLTg75oWfc0cRkUzC3BEM5LWG
aEVQddt/HEFVedQyENFSPOJ7GjXD3H0jauh712yJmBVMRwn+wgW7Heczx6KoD7np
AgMBAAEwDQYJKoZIhvcNAQELBQADggEBAFidJy/TYsuKGLNPsrp6AJTfSRg+oeLX
4qD8WgvU2Ok/NzIYG0dkHkWB+Pnr/KZijOA5GzAE1RtBqi6ah6GhFWlDpCQ+3WOg
HUQWwdqgzzEQSPZgzMliM0ReARMvoPzcR2L5hvdvS6BSuiitAknk9+rTQAieu3My
Oqep1P7VXX5k7LkFb/3g80w95kwV/o/GD7XRGMTSHvbcSjl6nWT/6WlcKxtSbS91
IX2qTAQjMVepCxxsnSc+Q6GTHgRdoAkMmRvnHwCQ4VN3cel5dGqOrdElujQPFw99
nZkk8rHkp+hKMasMibTOL3JD/As0KBLlDbDlO3MpQUype3mBxQCiEHY=
-----END CERTIFICATE-----\`\)`
    );
    fs.writeFileSync(filePath, newFileContent);
  } else {
    console.log(`File ${filePath} does not exist`);
  }
}
