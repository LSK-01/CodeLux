<script lang="ts">
    //https://firebase.google.com/docs/web/setup
    // import { initializeApp } from 'firebase/app';
    // import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
    // // Follow this pattern to import other Firebase services
    // // import { } from 'firebase/<service>';

    // // TODO: Replace the following with your app's Firebase project configuration
    // const firebaseConfig = {
    // //...
    // };

    // const app = initializeApp(firebaseConfig);
    // const db = getFirestore(app);

    // // Get a list of cities from your database
    // async function getCities(db) {
    // const citiesCol = collection(db, 'cities');
    // const citySnapshot = await getDocs(citiesCol);
    // const cityList = citySnapshot.docs.map(doc => doc.data());
    // return cityList;
    // }
    function getQuestions(){
        //will be different based on employee or manager
        const questions = [
            "I have received adequate training to help me complete the project", 
            "My manager supports me in any training I want to undertake to help me perform my role better", 
            "My team is easy to communicate with", 
            "My team work well together", 
            "I feel recognised and valued for my role and contribution to this project", 
            "I enjoy being a part of my company’s culture", 
            "I feel confident the project will be finished on time",
            "My team have the resources and skills necessary to complete the project", 
            "I feel satisfied with the frequency of feedback received from the customer" 
        ];
        return questions;
    }
</script>