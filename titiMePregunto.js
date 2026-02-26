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

// Tití Me Preguntó — Bad Bunny
// ─────────────────────────────────────────────────────────────
enviarLetra(`Ey
Tití me preguntó si tengo muchas novia'
Muchas novia'
Hoy tengo a una, mañana otra
Ey, pero no hay boda

Tití me preguntó si tengo muchas novia', je
Muchas novia'
Hoy tengo una, mañana otra

Me la' voy a llevar a to'a pa' un VIP
Un VIP, ey
Saluden a tití
Vamo' a tirarno' un selfie, say cheese, ey
Que sonrían las que ya les metí

En un VIP, un VIP, ey
Saluden a tití
Vamo' a tirarno' un selfie, say cheese
Que sonrían las que ya se olvidaron de mí

Me gustan mucho las Gabriela
Las Patricia, las Nicole, las Sofía
Mi primera novia en kinder, María
Y mi primer amor se llamaba Thalía

Tengo una colombiana que me escribe to' los día'
Y una mexicana que ni yo sabía
Otra en San Antonio que me quiere todavía
Y las de PR que todita' son mía'

Una dominicana que es uva bombón
Uva, uva bombón
La de Barcelona que vino en avión
Y dice que mi bicho está cabrón

Yo dejo que jueguen con mi corazón
Quisiera mudarme con todas pa' una mansión
El día que me case, te envío la invitación
Muchacho, deja eso, ey

Tití me preguntó si tengo muchas novia'
Muchas novia'
Hoy tengo una, mañana otra
Ey, pero no hay boda

Tití me preguntó si tengo muchas novia'
Ey, ey, muchas novia'
Hoy tengo una, mañana otra

Tití me preguntó-tó-tó-tó-tó-tó-tó-tó
Tití me preguntó-tó-tó-tó-tó-tó-tó-tó (qué pámpara)
Tití me preguntó-tó-tó-tó-tó-tó-tó-tó
Tití me preguntó-tó-tó-tó-tó

(Pero, ven acá, muchacho)
(¿Y para qué tú quiere' tanta' novia'?)

Me la' voy a llevar a to'a pa' un VIP
Un VIP, ey
Saluden a Tití
Vamo' a tirarno' un selfie, say cheese, ey
Que sonrían las que ya les metí

En un VIP, un VIP, ey
Saluden a Tití
Vamo' a tirarno' un selfie, say cheese
Que sonrían las que ya se olvidaron de mí

(Oye, muchacho 'el diablo azaroso)
(Suelta ese mal vivir que tú tiene' en la calle)
(Búscate una mujer seria pa' ti)
(Muchacho 'el diablo)
(Coño)

Yo quisiera enamorarme
Pero no puedo
Pero no puedo, eh, eh

Yo quisiera enamorarme
Pero no puedo
Pero no puedo

Sorry, yo no confío, yo no confío
Nah, ni en mí mismo confío
Si quieres quedarte hoy que hace frío
Y mañana te va', nah

Muchas quieren mi baby gravy
Quieren tener mi primogénito, ey
Y llevarse el crédito
Ya me aburrí, hoy quiero un totito inédito, je
Uno nuevo, uno nuevo, uno nuevo, uno nuevo

Hazle caso a tu amiga
Ella tiene razón
Yo voy a romperte el corazón
Voy a romperte el corazón

Ey, no te enamores de mí
No te enamores de mí, ey
Sorry, yo soy así, ey
No sé por qué soy así

Hazle caso a tu amiga
Ella tiene razón
Yo voy a romperte el corazón
Voy a romperte el corazón

No te enamores de mí (no)
No te enamores de mí (no), no
Sorry, yo soy así
Ya no quiero ser así, no`).then(n => console.log(`🐰 Listo. ${n} mensajes enviados.`)).catch(console.error)
