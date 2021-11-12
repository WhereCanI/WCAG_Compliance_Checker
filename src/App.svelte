<script lang="ts">
	let sQ: string = "";

	async function handleUrlSubmission(e: any): Promise<void> {
		e.preventDefault();
		console.log(sQ);
	}
</script>

<main class="WCC_Main">
	<div class="WCC_Row">
		<div class="WCC_SearchContainer">
			<h1 class="WCC_Headline1">WCAG Compliance Checker</h1>
			<form class="WCC_SearchForm" on:submit={handleUrlSubmission}>
				<div class="WCC_SearchForm_Row">
					<label class="WCC_Label" for="WCC_SearchQuery">Url address</label>
					<input type="url" class="WCC_Input" bind:value={sQ} autocapitalize="off" autocomplete="off" />
				</div>
				<button type="submit" class="WCC_SubmitButton">Submit</button>
			</form>
		</div>
	</div>
	<div class="WCC_Row">
		<div class="WCC_SearchResults"></div>
	</div>
</main>