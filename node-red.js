// const NodeRSA = require('node-rsa');
// const CryptoJS = require('crypto-js');
// const fs = require('fs');

const cryptoJSAesKey = 'password';

const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCq7+ofmFy9fOHs
/lzI+I/o4rm26BbLkUQNEMSL+YZUk5QO+kuZ+O4+UuwEZBlms709V81Bb5U9YrwZ
jegl3lMe2DtjTA86CL5eCXEB2gJ9TsNJz3GODgmyIkWbm1+A+Ue3/00+8SRvk1tm
Vk2Gecfm+jXrS8xYH8Xa2H1Pw20ScgN0aZSSx2rxm62x4yMON+waZxpnmOg4y0ue
DU1++QbkW/4B9l58joC8Kq6m323G+Z0Nq0WbTEgbXpwR09xeLTg75oWfc0cRkUzC
3BEM5LWGaEVQddt/HEFVedQyENFSPOJ7GjXD3H0jauh712yJmBVMRwn+wgW7Hecz
x6KoD7npAgMBAAECggEARPZVtjl58NiZLUvRkyL0rDgMRMaNq8MHeV3ybaZVk3mW
mhRQu+W5+Frr7TmVJeINztnFbUjfJMzYplah+eUgE6mZDA57diZg5v9YIC8cIgHM
t9KBNZZkQwGgo46jkR0A2jKdr28KDBmfHkJjNIWdKIp5hlwmLMdkw03kAHIPZwj/
UqXakSSluus2GjF324W+HvbvTxcVP6jK4+T5hOrCAaIi9V23OnYeqQ0zFQl51iEj
ORWKaJnYOwYdSRmtpnk5PcvMj3Nfc+sZrNvXMrvTnszJ3QOX4CTY7NPuuwKm9FQs
94e8EjkI5PoVRgOgv3+rWVhl/i+ByeLwezx0hXwnoQKBgQDeMboEO3Zmbb33kuAY
omcPj7CRSjVsFvKVutuXfMhr9s0mKPWTaYStfMjZZxtBDx5l5Y3JnynMeTI3K3ll
iTmWSnUKGPWqVtjBWXrXrMPcnu5kEWNfYmunT4TXxX+E7sGimLelHopyjwQlh/GI
mnOcZv+TjQrUIKmOxfkMCxkk9wKBgQDE8cTkUNFMteUjNStMmYogRbniDmCTsRYI
aanL6TT0CkFDSYsqu9iNADdYhPhQqacSpvwQ4MAuIMGnSg1nudomyzUenwuueWYT
HoBmjCw/5gAb3Wv6uGm3hMlrgnmTvNaPecVKI8K2jnxZw2Z7uOrkoWOp974qTwqr
U7uw2k3AHwKBgB+YRJIrfmeMPVIB8ZmvJiaBUSMnwTbwgGgoHOeKl9k6S+ucMWdX
vsUIlGrNjYOPycvFe4bq+f+YUDqmFOoKPEURq1jXOb+R/9pmheA7MdKiStWx30aF
8TbmSMaBz+MwLBqZyqtRD3DAw18u2HqLM9tOjhMGID8PseyaXBKJVXb7AoGAWe+u
YjUl30oRYYqeQ1S6ZxJwWHMIV2m/DghyqdPNgsRMGVY0X0d5FKrMm3fdjbhru3DW
Gz8HhAkhZivDA2Mz5BNYJquqwfpeSszbBfltG6EE27S54rzkShIxiQ8ERhsuQEbz
eW/rM0LONo+s9UL0wYOR58Ri6x89WA/c3l5SszECgYAOKywZqLNkuHaIaQn9d3uR
THWfKLgQV2Nj3hr+TEQSjS+cCwKa97lQlV/8e8Fm4eBV21fEBqlw4y0OWm17AJLQ
eKdVUfdXOvD6QSyT1hXkOYFqyyOpcwkVossxxbSVuCQmo5mo+5gnYE1CldpiHUYx
YmwI04qgNvf7Jbj44igqKg==
-----END PRIVATE KEY-----`;

const key = new NodeRSA(privateKey);

const createdAt = new Date();
const expiresAt = new Date();
expiresAt.setDate(expiresAt.getDate() + 6000);

const data = {
  createdAt: createdAt,
  issuedAt: createdAt,
  expiresAt: expiresAt,
  terminatesAt: expiresAt,
  validTo: expiresAt,
  entitlements: [
    {
      id: '84a9c852-1349-478d-9ad1-b3f55510e477',
      productId: '670650f2-72d8-4397-898c-c249906e2cc2',
      productMetadata: {
        terms: {
          isMainPlan: true
        }
      },
      features: {
        'feat:sharing': true,
        'feat:ldap': true,
        'feat:saml': true,
        'feat:logStreaming': true,
        'feat:advancedExecutionFilters': true,
        'feat:variables': true,
        'feat:sourceControl': true,
        'feat:apiDisabled': false,
        'feat:externalSecrets': true,
        'feat:showNonProdBanner': false,
        'feat:workflowHistory': true,
        'feat:debugInEditor': true,
        'feat:binaryDataS3': true,
        'feat:multipleMainInstances': true,
        'feat:workerView': true,
        'feat:advancedPermissions': true
      },
      featureOverrides: {},
      validFrom: createdAt,
      validTo: expiresAt
    }
  ],
  tenantId: 1
};

const encryptedSymmetricKey = key.encryptPrivate(cryptoJSAesKey, 'base64');
const encryptedData = CryptoJS.AES.encrypt(
  JSON.stringify(data),
  cryptoJSAesKey
);
const signature = key.sign(JSON.stringify(data), 'base64');
const licenseKey = `-----BEGIN LICENSE KEY-----${encryptedSymmetricKey}||${encryptedData}||${signature}-----END LICENSE KEY-----`;

msg.payload = {
  licenseKey: licenseKey,
  x509: `-----BEGIN CERTIFICATE-----
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
-----END CERTIFICATE-----
`
};

return msg;
