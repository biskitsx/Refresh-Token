import jwt from "jsonwebtoken";

const privateKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEApMlT3Db+e+jthKbRiQVNfnB8CHLMR0xkvslngOJnuPREIHvJ
eP5EOFsLe9cgd83G8m0eHysnUXAia9vx2ZnHuk9IU10sfCneqRNoNOai9N6ggQp6
FY9Q9RC6DCLcbf6Y0pTpX5Q/0O+4o0tOUMPhg1zfg7DL/Kk86xv8uskOxdmVCZav
jkpzZbSpHWD9YqlDUsfS/Ri2S3Wv/3jL4AQ5ffDX9WpFgnfjX2LOw3cUWK1OklS8
9tSwFD8I+g+SLu1F4mSd9FU+GhA7RAmSWWzdUBY6KN2IYB50j6lvQRewpeHZ3Qat
RNj9k4G5f8zdh8Quz2R46R+LE+Gd9g8PtF26jQIDAQABAoIBAGvdiXJF4VEUyJ0j
YVdSzEYutVIGaydknzGvvnvEN+b+pbWpsdjsf5VwK1U2HX+uiELaIHSAl+0b/Lwj
re0lV3LiQNKo09y2v5RnKrguHI8zR1cQl5eTR4gTGeWl0CqEFF8LsLOq5BcNRAxH
2AzQG8cUPQ8D5JMP6NtxZ36Q64Wf+Z3YntHK9YOxEoxpbbiuBrbI36q3Z8gceN1L
ViVyFCqbcQ+a+QraQEhYWK/nMPX8fDu+fKwgfk8I+GNspd6b4dqzVAxci1iUwe0F
12DFIBpq2acpvhWkklXn55BhNSmIzLEHZbxGpfGxErumXDr6LiqXtSWmx8rFAlhl
ecEPVoECgYEA0HnasHMWvL6aZb7KxBqahlmTuMcD+5+TUo8R8M3JuXrEjc2aKoeu
heKgspbT21niUlTDtQuMbS4cNtZ86J4gl6PzU2Yj16Yu+kfLwaSbUWDmGg8SMVL6
J8E5LoV22XDEKXYqVpJ1548BRvKsLHXHLbDe2V14AH2uGyY6rI0nbaECgYEAylnb
ukxnyLr7mcasE3Jkfq4HANV6g5IDepRtKShFaTTa1dARBymfr/RnKLwGiOAQRc//
s6kDG3ZpJTdZV7zXWQfKgcZNSDn7iB6JwV2+YTc3T1JQ7t/SFflfjZAXOgx+0iAM
vI1ZtbGtu3nQ+PVzAUUPlOEjr8p0MSyHqYZW7W0CgYAOof7vk6Rs6xP7QEELMrLV
60OrHIzzBGhayx//PvKBylQxf9TqV0uwqg+NeXi1VMHF9Z0nAACDSVFBqBxsV20C
N8fEes7ZPBjgCFoM5XjhZWPBQH2OaLyWPcG9ujB1YqziHCEsomsULb1xNWdQV5P7
aQa7Sww5PJkT3sMPiXjTAQKBgHOH/oZNnWvkJkbUQecQhwQ1BFabjEmWklnoaLL5
BTheLxuoojA+uafSmRuOzwRTObdCXLINK3MAlmPjSCVp8mIoqpyRxgoY4N4E4Y3/
ofULe47UZtUcAWz+ZmoC/N/txnLeTadR5QhyG8lQcdnS+gidj5nnOWLi6pgw3nwR
8Yu5AoGBAJQMqdbXi4TzH0j/KAgD11JpZ8p3jvzJrXtTfJ38HP11fx4AtdCeI4qF
eLOr6Pii5mpBZUFOex5J1itctEhK6Qe1QevKTacAuzLrTwiO4VTK9xE6UV3hqcIf
qXYV7W1NUI1MM+SJQXct6djI6VjZAhYgVOJoJKtS3BllCUlMJ/MB
-----END RSA PRIVATE KEY-----`

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApMlT3Db+e+jthKbRiQVN
fnB8CHLMR0xkvslngOJnuPREIHvJeP5EOFsLe9cgd83G8m0eHysnUXAia9vx2ZnH
uk9IU10sfCneqRNoNOai9N6ggQp6FY9Q9RC6DCLcbf6Y0pTpX5Q/0O+4o0tOUMPh
g1zfg7DL/Kk86xv8uskOxdmVCZavjkpzZbSpHWD9YqlDUsfS/Ri2S3Wv/3jL4AQ5
ffDX9WpFgnfjX2LOw3cUWK1OklS89tSwFD8I+g+SLu1F4mSd9FU+GhA7RAmSWWzd
UBY6KN2IYB50j6lvQRewpeHZ3QatRNj9k4G5f8zdh8Quz2R46R+LE+Gd9g8PtF26
jQIDAQAB
-----END PUBLIC KEY-----`

export class tokenManager {
    static createToken(payload: any, expiresIn: string | number) {
        return jwt.sign(payload, privateKey, { algorithm: "RS256", expiresIn });
    }
    static verifyToken(token: string) {
        try {
            const decoded = jwt.verify(token, publicKey);
            return { payload: decoded, expired: false }
        } catch (error: any) {
            console.log("expire laewwwww")
            return { payload: null, expired: true }
        }
    }
}
