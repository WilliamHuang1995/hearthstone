---
layout: default
title: List View &#124; Hearthstone Party
permalink: /list/
list: true
---

<div class="list-view">
	<a href="/">
		<img class="ಠ_ಠ" src="../img/assets/logo.png" alt="Hearthstone Swirl">
	</a>
	<div class="container">
		<h1>Hearthstone Challenges</h1>
	</div>
	<ul>
		{% for list in site.data.challenges %}
			<li>
				<a href="/#{{ forloop.index }}">
					<span class="number">
						{{ forloop.index }}
					</span>
					<span class="challenge">
						{{ list.challenge }}
					</span>
				</a>
			</li>
		{% endfor %}
	</ul>
	<a href="/idea" class="button push">
		<svg class="icon icon-shield"><use xlink:href="#icon-shield"></use></svg>
		Suggest more
	</a>
</div>