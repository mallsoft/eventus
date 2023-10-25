<h1>Info</h1>
<article>
	<h2>Privacy Statement</h2>
	<p>
		We take your privacy seriously and want you to understand how we collect, use, and protect your
		data.
	</p>

	<h3>Data Collection and Storage</h3>

	<p>We collect and store the following information:</p>

	<ul>
		<li>Your identity provider (e.g., GitHub, LinkedIn).</li>
		<li>The events you are registered for (including time and data provided by you).</li>
	</ul>

	<h3>Data Protection</h3>

	<p>We prioritize the security of your data through:</p>

	<ul>
		<li>Utilizing secure login sessions to safeguard your data and manage event registrations.</li>
		<li>Using your personal information only to track event attendance.</li>
	</ul>

	<h3>Data Retention</h3>

	<p>
		We believe in data minimization and regularly purge data from our storage. This is usually done
		right after the conclusion of events to ensure your information is not retained longer than
		necessary.
	</p>

	<h3>Your Control</h3>

	<p>
		Your privacy is in your hands. If you wish to have your specific data removed, you can take the
		following steps:
	</p>

	<ul>
		<li>Unregister from any events you are registered for.</li>
		<li>Disconnect your identity provider.</li>
	</ul>
	<p>
		If you have any data requests or concerns, please don't hesitate to contact us via email at:
		<br /><a href="mailto:adrian.kristoffer.borgund@dnb.no">adrian.kristoffer.borgund@dnb.no</a>
	</p>
</article>

<article>
	<h2>About</h2>
	<p>
		This application is created with svelte/sveltekit, hosted on fly.io, using supabase for data
		storage and authentication. The repository is available <a
			href="https://github.com/mallsoft/eventus">here</a
		>.
	</p>
	<p>Any contributions or issues you identify are welcome!</p>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		margin-bottom: 3rem;

		line-height: 1.25;
	}

	h3 {
		margin-top: 2rem;
	}

	ul li {
		list-style-type: square;
		list-style-position: inside;
	}

	a {
		color: var(--color-d);
	}
</style>
