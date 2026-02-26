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

// BAILE INoLVIDABLE — Bad Bunny
// ─────────────────────────────────────────────────────────────
enviarLetra(`Pensaba que contigo iba a envejecer
En otra vida, en otro mundo, podrá ser
En esta, solo queda irme un día
Y solamente verte en el atardecer

Si me ven solo y triste, no me hablen
Si me ven solo y triste, soy culpable
La vida es una fiesta que un día termina
Y fuiste tú mi baile inolvidable

Y fuiste tú mi baile inolvidable
Eh-eh, eh-eh
Eh-eh, eh-eh

(Mientras uno está vivo)
(Uno debe amar lo más que pueda)

Pensaba que contigo iba a envejecer
En otra vida, en otro mundo, podrá ser
En esta, solo queda irme un día
Y ver pa'l cielo a ver si te veo caer

Si me ven solo y triste, no me hablen
Si me ven solo y triste, soy culpable
La vida es una fiesta que un día termina
Y fuiste tú mi baile inolvidable

No, no te puedo olvidar
No, no te puedo borrar
Tú me enseñaste a querer
Me enseñaste a bailar

No, no te puedo olvidar
No, no te puedo borrar
Tú me enseñaste a querer
Me enseñaste a bailar

Yeah-yeah-yeah-yeah, ey
Dime cómo le hago pa' olvidarte
Hay un paso nuevo que quiero enseñarte
En las noche', ya ni puedo dormir
Lo que hago es soñarte

No, no te puedo olvidar
No, no te puedo borrar
Tú me enseñaste a querer
Me enseñaste a bailar

Como tú me besabas
Como yo te lo hacía
Como tú me mirabas
Bellaquito, me ponía

Se siente feo no tenerte cerquita
La nueva mama bien, pero no es tu boquita
Mi diabla, mi ángel, mi loquita
Mi diabla, mi ángel, mi loquita, ey

Esto suena cabrón
Vamo' a hacerlo otra ve'
Como anoche, como anoche

Tan-tan, ta-na-na, ta-na-na
Aprieta, chamaquito, aprieta

(¡Ahí, ahí, ahí, vamo' allá!)

No, no te puedo olvidar
No, no te puedo borrar
Tú me enseñaste a querer
Me enseñaste a bailar

Ay, yo con cualquiera me puedo acostar
Pero no con cualquiera quiero despertar
Solo con usted, con usted
Yo bailo con usted, na' más con usted
Un beso donde estés, donde estés, bebé

No, no te puedo olvidar
No, no te puedo borrar
Tú me enseñaste a querer
Me enseñaste a bailar

Y yo tenía muchas novia'
Pero como tú, ninguna
Ya no tengo mi Sol, me paso en la Luna
Si te pienso, me tiro de una

Eh-eh, mi diabla, mi ángel, mi loquita
Mi diabla, mi ángel, mi loquita, eh-eh`).then(n => console.log(`🐰 Listo. ${n} mensajes enviados.`)).catch(console.error)
