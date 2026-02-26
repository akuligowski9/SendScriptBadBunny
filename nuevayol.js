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

// NUEVAYoL — Bad Bunny
// ─────────────────────────────────────────────────────────────
enviarLetra(`¡Nueva Yol!

Si te quieres divertir
Con encanto y con primor
Solo tienes que vivir (¿pa' dónde?)
Un verano en Nueva York (¡Nueva York!)

Si te quieres divertir
Con encanto y con primor (¿pero qué es esto?)
Solo tienes que vivir (¿y este frío?)
Un verano en Nueva York (un ratito na' má')

Ey, ey, ey, 4 de julio, 4th de July
Ando con mi primo borracho, rulay
Los mío' en El Bronx saben la que hay
Con la nota en high, por Washington Heights

Willie Colón, me dicen el malo, ey
Porque pasan los año' y sigo dando palo'
Vendiendo disco' como cuadro' Frida Kahlo

El perico es blanco, sí, sí, el tusi rosita, eh, eh
No te confunda', no, no, mejor evita, ey
Un shot de cañita en casa de Toñita y PR se siente cerquita
Sí, sí, sí, como el campeonato, nadie me lo quita

(The best, el mejor)
(Number one, the best, el mejor, ¿okey? ¡Puerto Rico!)

¿Cómo Bad Bunny va a ser rey del pop
Ey, con reggaeton y dembow?
Ey, con reggaeton y dembow
Sí, con reggaeton y dembow

¿Cómo Bad Bunny va a ser rey del pop
Ey, con reggaeton y dembow?
Me siento como el Lápiz en Capea El Dough
Cuando yo nací, fue que nació el flow

De la'o a la'o, ping-pong
Un flow pesa'o, Big Pun
Con silenciador, les robamo' las gata'
James Bond, ey

Yo estoy en la mía, no tengo adversario, no
Con Los Yankee' y Los Met', Juan Soto
A correr, que otra ve' la sacamo' 'el estadio

Si te quieres divertir
Con encanto y con primor
Solo tienes que vivir (ya mismo nos vamo')
Un verano en Nueva— (un ratito má', un ratito)

Shh, cuida'o, que nadie nos escuche
Shh, cuida'o, que nadie nos escuche
Shh, cuida'o, que nadie nos escuche
Shh, cuida—

Tú tiene' piquete, mami, yo también
Tú estás buena, yo estoy bueno también
Huelo rico y ando con los de cien
Si tú lo quiere', lo tiene' que mover

Tú tiene' piquete, mami, yo también
Tú estás buena, yo estoy bueno también
Huelo rico y ando con los de cien
Si tú lo quiere', lo tiene' que mover

Lo tiene' que move'-ve'-ve'-ve'-ve'-ve'-ve'-ve'-ve'-ve'-ve'-ve'
Lo tiene' que move'-ve'-ve'-ve'-ve'-ve'-ve'-ve'-ve'-ve'-ve'-ve'
Lo tiene' que move'-ve'-ve'-ve'-ve'-ve'-ve'-ve'-ve'-ve'-ve'-ve'
Lo tiene' que move'-ve'-ve'-ve'-ve'-ve'-ve'-ve'-ve'-ve'-ve'-ve'-ve'-ve'-ve'
Shh`).then(n => console.log(`🐰 Listo. ${n} mensajes enviados.`)).catch(console.error)
