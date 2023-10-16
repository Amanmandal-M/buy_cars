exports.registerMail = (user) => {
    const registerMailHandler = {
      email: user.email,
      subject: "Welcome to BuyCars Backend !",
      body: `
          <html>
              <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
                  <h2>Welcome to BuyCars ${user.name} !</h2>
                  <p>Thank you for registering with BuyCars</p>
                  <p>BuyCars is an innovative platform dedicated to providing high-quality second-hand cars at affordable prices. Powered by React.js and Node.js, our platform offers a seamless shopping experience with a range of advanced features. These include robust user authentication, intuitive product browsing, efficient cart management, and hassle-free payment processing. Elevate your online car shopping experience with BuyCars today.</p>
                  <p>Happy exploring!</p>
                  <p>Best regards,</p>
                  <p>The BuyCars Team</p>
                  <a href="https://localhost:8080/api/auth/login">Now Proceed for Login</a>
              </body>
          </html>
      `,
    };
    return registerMailHandler;
};
  

exports.loginMail = (user, otpMail) => {
    const loginMailHandler = {
      email: user.email,
      subject: "Welcome to BuyCars - Login OTP",
      body: `
          <html>
            <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
              <h2>Welcome to BuyCars ${user.name} !</h2>
              <p>Thank you for logging in with BuyCars. Please use the following OTP to complete your further process:</p>
              <h3>${otpMail}</h3>
              <p>Do not share this OTP with anyone.</p>
              <p>Happy exploring!</p>
              <p>Best regards,</p>
              <p>The BuyCars Team</p>
              <a href="http://localhost:8080/api/auth/login">Now Proceed for OTP Verification</a>
            </body>
          </html>
        `,
    };
  
    return loginMailHandler;
  };
  