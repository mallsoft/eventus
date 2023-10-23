<script>
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
</script>

{#if $page.form?.imageError}
	<div class="errorbois">
		<h3>Image upload error</h3>
		<p>
			{$page.form?.imageError}
		</p>
	</div>
{/if}

<form action="?/imageUpload" method="post" enctype="multipart/form-data">
	<input type="file" name="image" required />
	<button type="submit">Upload image</button>
</form>

<style>
	.errorbois {
		padding: 1rem;
		margin: 1rem 0;
		background-color: var(--color-err-bg);
		color: var(--color-err-text);
	}

	form {
		margin-bottom: 2rem;
	}
</style>
