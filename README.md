# TOTP

I tried out a library [`speakeasy`](https://www.npmjs.com/package/speakeasy)
but later found out that it's deprecated. Then in the issues I found someone
suggests `otplib`, I read it's documentations and found that it's up-to-date,
has a large community.

## Helpful links

- [OTP URI Format](https://github.com/google/google-authenticator/wiki/Key-Uri-Format)
- [Implementing 2FA Using Speakeasy](https://blog.logrocket.com/implementing-two-factor-authentication-using-speakeasy/)

  "After we have entered the secret key in the authenticator app, we need to
  verify it so we can use it to generate codes. You will notice that we stored
  the secret as a temporary secret. After confirmation, we can go ahead and
  store it permanently. To perform the verification, we need to create an
  endpoint that receives the user ID and a code from the authenticator app.
  The endpoint then verifies them against the stored temporary secret and if
  everything checkouts out, we store the secret permanently"
