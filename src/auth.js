import { mapGetters } from 'vuex'; // Dodajemo mapGetters iz Vuex-a

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
    ...mapGetters(['currentUser']), // Dodajemo getter za trenutno prijavljenog korisnika
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
            this.$store.dispatch('setUser', this.username); // Pozivamo akciju za postavljanje trenutno prijavljenog korisnika
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
    logout() {
      fetch('http://localhost:3000/logout', {
        method: 'POST',
      })
        .then((response) => {
          if (response.status === 200) {
            console.log('Odjava uspješna');
            this.$store.dispatch('setUser', null); // Pozivamo akciju za postavljanje trenutno prijavljenog korisnika na null
            this.$router.push('/LoginPage'); // Preusmjeri korisnika na LoginPage nakon odjave
          } else {
            console.error('Greška prilikom odjave:', response.status);
          }
        })
        .catch((error) => console.error('Greška prilikom odjave:', error));
    },
  },
};
