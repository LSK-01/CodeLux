<script lang="ts">
	import { goto } from "$app/navigation";
    import userStore  from "../../userStore";

    console.log('dashboard')
/*     userStore.subscribe(async ({loggedIn, user}) => {
        if(!loggedIn){
            await goto('/login');
        }
        else if(user){
            console.log(user.email)
        }
    }) */
</script>
<h1>dashboard</h1>