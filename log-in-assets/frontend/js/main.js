/*=============== SHOW/HIDE PASSWORD LOGIN ===============*/
const togglePasswordVisibility = (inputId, iconId) => {
   const input = document.getElementById(inputId);
   const iconEye = document.getElementById(iconId);

   iconEye.addEventListener('click', () => {
       // Toggle password visibility
       input.type = input.type === 'password' ? 'text' : 'password';

       // Toggle icon class
       iconEye.classList.toggle('ri-eye-fill');
       iconEye.classList.toggle('ri-eye-off-fill');
   });
};
togglePasswordVisibility('password', 'loginPassword'); // Login form
togglePasswordVisibility('passwordCreate', 'loginPasswordCreate'); // Registration form

/*=============== HANDLE LOGIN FUNCTIONALITY ===============*/
const handleLogin = async () => {
   const email = document.getElementById('email').value;
   const password = document.getElementById('password').value;
   const error = document.querySelector('.login__error'); // Add this error element in your HTML if needed

   if (email && password) {
       try {
           const response = await fetch('http://localhost:4000/api/user/login', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ email, password }),
           });

           const data = await response.json();

           if (response.ok) {
               alert(`Welcome back, ${data.user.name}!`);
               error.style.display = 'none';
               localStorage.setItem('user', JSON.stringify(data));
               // Redirect or show the home page
               document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));
               document.getElementById('home').classList.remove('hidden');
           } else {
               error.textContent = data.message || 'Invalid email or password.';
               error.style.display = 'block';
           }
       } catch (err) {
           error.textContent = 'An error occurred. Please try again later.';
           error.style.display = 'block';
       }
   } else {
       error.textContent = 'All fields are required!';
       error.style.display = 'block';
   }
};

/*=============== HANDLE REGISTRATION FUNCTIONALITY ===============*/
const handleRegistration = async () => {
   const name = document.getElementById('name').value;
   const surname = document.getElementById('surname').value;
   const email = document.getElementById('emailCreate').value;
   const password = document.getElementById('passwordCreate').value;
   const error = document.querySelector('.register__error');

   if (name && surname && email && password) {
       try {
           const response = await fetch('http://localhost:4000/api/user/', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ name, surname, email, password }),
           });

           const data = await response.json();

           if (response.ok) {
               alert('Sign Up Successful! Redirecting to Login page...');
               error.style.display = 'none';
               document.getElementById('loginAccessRegister').classList.remove('active'); // Adjust if "active" class applies
           } else {
               error.textContent = data.message || 'Sign Up Failed!';
               error.style.display = 'block';
           }
       } catch (err) {
           error.textContent = 'An error occurred. Please try again later.';
           error.style.display = 'block';
       }
   } else {
       error.textContent = 'All fields are required!';
       error.style.display = 'block';
   }
};

/*=============== EVENT LISTENER FOR "CREATE ACCOUNT" BUTTON ===============*/
document.getElementById('createAccountButton').addEventListener('click', handleRegistration);


/*=============== SHOW/HIDE LOGIN & CREATE ACCOUNT ===============*/
const loginAccessRegister = document.getElementById('loginAccessRegister');
const buttonRegister = document.getElementById('loginButtonRegister');
const buttonAccess = document.getElementById('loginButtonAccess');

buttonRegister.addEventListener('click', () => {
   loginAccessRegister.classList.add('active');
});

buttonAccess.addEventListener('click', () => {
   loginAccessRegister.classList.remove('active');
});

/*=============== EVENT LISTENERS FOR LOGIN & REGISTRATION ===============*/
document.querySelector('.login__form').addEventListener('submit', (event) => {
   event.preventDefault(); // Prevent form submission
   handleLogin();
});

document.querySelector('.register__form').addEventListener('submit', (event) => {
   event.preventDefault(); // Prevent form submission
   handleRegistration();
});

/*=============== SHOW HIDE PASSWORD LOGIN ===============*
const passwordAccess = (loginPass, loginEye) =>{
   const input = document.getElementById(loginPass),
         iconEye = document.getElementById(loginEye)

   iconEye.addEventListener('click', () =>{
      // Change password to text
      input.type === 'password' ? input.type = 'text'
						              : input.type = 'password'

      // Icon change
      iconEye.classList.toggle('ri-eye-fill')
      iconEye.classList.toggle('ri-eye-off-fill')
   })
}
passwordAccess('password','loginPassword')

/*=============== SHOW HIDE PASSWORD CREATE ACCOUNT ===============*
const passwordRegister = (loginPass, loginEye) =>{
   const input = document.getElementById(loginPass),
         iconEye = document.getElementById(loginEye)

   iconEye.addEventListener('click', () =>{
      // Change password to text
      input.type === 'password' ? input.type = 'text'
						              : input.type = 'password'

      // Icon change
      iconEye.classList.toggle('ri-eye-fill')
      iconEye.classList.toggle('ri-eye-off-fill')
   })
}
passwordRegister('passwordCreate','loginPasswordCreate')

/*=============== SHOW HIDE LOGIN & CREATE ACCOUNT ===============*
const loginAcessRegister = document.getElementById('loginAccessRegister'),
      buttonRegister = document.getElementById('loginButtonRegister'),
      buttonAccess = document.getElementById('loginButtonAccess')

buttonRegister.addEventListener('click', () => {
   loginAcessRegister.classList.add('active')
})

buttonAccess.addEventListener('click', () => {
   loginAcessRegister.classList.remove('active')
}) */
