async function enviarLetra(letra) {
	const delayInput = prompt("⏱ Delay between messages (milliseconds)\n• Under 600ms = messages group into one notification\n• 600ms or more = each message pings separately\nExamples: 300 = fast, 1000 = 1 ping per line", "500");
	const delay = parseInt(delayInput) || 500;

	const burstInput = prompt("💥 Group mode: send X lines at a time, then pause for a notification to fire.\nEnter group size, or 0 to send one line at a time.", "0");
	const burstSize = parseInt(burstInput) || 0;

	const burstDelay = burstSize > 0
		? parseInt(prompt("⏸ Delay between bursts (milliseconds)\nRecommended: 6000 or more to trigger separate notifications.", "6000")) || 6000
		: 0;

	const lines = letra.split(/[\n\t]+/).map(line => line.trim()).filter(line => line);
	const textarea = document.querySelectorAll("div[contenteditable='true']")[1];

	if (!textarea) throw new Error("No hay una conversación abierta");

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];
		console.log(`[${i + 1}/${lines.length}] ${line}`);

		textarea.focus();
		document.execCommand('insertText', false, line);
		textarea.dispatchEvent(new Event('change', {bubbles: true}));

		await new Promise(resolve => setTimeout(resolve, 150));

		textarea.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true}));

		if (i < lines.length - 1) {
			const isEndOfBurst = burstSize > 0 && (i + 1) % burstSize === 0;
			await new Promise(resolve => setTimeout(resolve, isEndOfBurst ? burstDelay : delay));
		}
	}

	return lines.length;
}

// Dakiti — Bad Bunny
// ─────────────────────────────────────────────────────────────
enviarLetra(`Baby, ya yo me enteré, se nota cuando me ve'
Ahí donde no ha' llega'o, sabe' que yo te llevaré
Y dime qué quiere' beber, e' que tú ere' mi bebé
Y de nosotro' quién va a hablar, si no nos dejamo' ver

Y a vece' e' Dolce, a vece' e' Bulgari
Cuando te lo quito después' de lo' partie'
La copa de vino, la libra de mari
Tú está' bien suelta y yo de safari

Tú mueve' el culo fenomenal
Pa' yo devorarte como animal
Si no te ha' veni'o, yo te vo' a esperar
En mi cama, y lo voy a celebrar

Baby, a ti no me opongo
Y siempre te lo pongo
Y si tú me tira'
Vamo' a nadar en lo hondo

Si e' por mí, te lo pongo
De septiembre hasta agosto
A mí sin cojones
Lo' que digan tu' amiga'

Ya yo me enteré, se nota cuando me ve'
Ahí donde no ha' llega'o, sabe' que yo te llevaré
Y dime qué quiere' beber, e' que tú ere' mi bebé
Y de nosotro' quién va a hablar, si no nos dejamo' ver

(¿Me sigue'?)

Mami, me tiene' juquea'o, sé
Si fuera' la uru', me tuviese' parquia'o
Dando vuelta por el Condado
Contigo siempre arrebata'o

Tú no ere' mi señora
Pero toma cinco mil y gástalo en Sephora
Louis Vuitton, ya no compra en Pandora
Como piercing, a los hombre' perfora, eh eh eh

Hace tiempo le rompieron el cora (el cora)
Estudiosa, puesta pa' ser doctora (doctora)
Pero le gustan lo' títere' wheeleando motora (motora)
Yo estoy pa' ti la' veinticuatro hora'

Baby, a ti no me opongo
Y siempre te lo pongo (yo te lo pongo)
Y si tú me tira'
Vamo' a nadar en lo hondo (nadar en lo hondo)

Si e' por mí, te lo pongo
De septiembre hasta agosto
Y a mí sin cojone'
Lo' que digan tu' amiga'

Ya yo me enteré, se nota cuando me ve'
Ahí donde no ha' llega'o, sabe' que yo te llevaré
Y dime qué quiere' beber, e' que tú ere' mi bebé
Y de nosotro' quién va a hablar, si no nos dejamo' ver

Y a vece' e' Dolce, a vece' e' Bulgari
Cuando te lo quito después' de lo' partie'
La copa de vino, la libra de mari
Tú está' bien suelta y yo de safari

Tú mueve' el culo fenomenal
Pa' yo devorarte como animal
Si no te ha' veni'o, yo te vo' a esperar
En mi cama, y lo voy a celebrar`).then(n => console.log(`🐰 Listo. ${n} mensajes enviados.`)).catch(console.error)
