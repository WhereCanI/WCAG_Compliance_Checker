<script lang="ts">
	let sQ: string = "";
	let r: any = [];
	let loading: boolean = false;

	async function handleUrlSubmission(e: any): Promise<void> {
		e.preventDefault();
		loading = true;
		
		const apiResp: Response = await fetch('/runwcag', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ "obj": {
                "url" : sQ
            }})
		});
		const apiResp_JSON: any = await apiResp.json();

		if (apiResp_JSON.status === "Success") {
			r = apiResp_JSON;
			loading = false;
		} else {

		}
		
		console.log(r);
	}
</script>

<main class="WCC_Main">
	<section class="WCC_Row">
		<div class="WCC_SearchContainer">
			<h1 class="WCC_Headline1">WCAG Compliance Checker</h1>
			<form class="WCC_SearchForm" on:submit={handleUrlSubmission}>
				<div class="WCC_SearchForm_Row">
					<label class="WCC_Label" for="WCC_SearchQuery">Url address</label>
					<input type="url" id="WCC_SearchQuery" class="WCC_Input" bind:value={sQ} autocapitalize="off" autocomplete="off" />
				</div>
				<div class="WCC_SearchForm_Row">
					{#if loading}
						<span>Loading...</span>
					{/if}
					<button type="submit" class="WCC_SubmitButton">Submit</button>
				</div>
			</form>
		</div>
	</section>
	{#if r?.results?.issues?.length >= 1}
		<section class="WCC_Row">
			<div class="WCC_SearchResults">
				<ul>
					{#each r.results.issues as o}
						<li>
							<span>{o.code}</span>
						</li>
					{/each}
				</ul>
			</div>
		</section>
	{/if}
</main>