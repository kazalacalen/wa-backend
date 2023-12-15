import { MongoClient } from 'mongodb';


export default {
    data() {
      return {
        username: '',
        password: '',
        arrivalDate: '',
        departureDate: '',
      };
    },
    computed: {
      isUsernameValid() {
        return this.username.length > 6;
      },
      isPasswordValid() {
        return this.password.length > 6;
      },
      isArrivalDateValid() {
        return !!this.arrivalDate;
      },
      isDepartureDateValid() {
        return !!this.departureDate;
      },
    },
    methods: {
      signup() {
        if (!this.isUsernameValid || !this.isPasswordValid || !this.isArrivalDateValid || !this.isDepartureDateValid) {
          return;
        }
  
        fetch('http://localhost:3000/SignUp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
            arrivalDate: this.arrivalDate,
            departureDate: this.departureDate,
          }),
        })
          .then((response) => {
            if (response.status === 201) {
              console.log('Registracija uspješna');
            } else {
              console.error('Greška prilikom registracije:', response.status);
            }
          })
          .catch((error) => {
            console.error('Greška prilikom registracije:', error);
          });
      },
      login() {
        if (!this.isUsernameValid || !this.isPasswordValid) {
          return;
        }
  
        fetch('http://localhost:3000/LoginPage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            password: this.password,
          }),
        })
          .then((response) => {
            if (response.status === 200) {
              console.log('Prijava uspješna');
            } else if (response.status === 401) {
              console.warn('Pogrešno korisničko ime ili lozinka');
            } else {
              console.error('Greška prilikom prijave:', response.status);
            }
          })
          .catch((error) => {
            console.error('Greška prilikom prijave:', error);
          });
      },
    },
  };