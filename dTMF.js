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

// DeBÍ TiRAR MáS FOToS — Bad Bunny
// ─────────────────────────────────────────────────────────────
enviarLetra(`Eh-eh, eh-eh, eh-eh, eh-eh

Otro sunset bonito que veo en San Juan
Disfrutando de todas esas cosas que extrañan los que se van (van, van)
Disfrutando de noche' de esas que ya no se dan (dan, dan)
Que ya no se dan (dan)

Pero queriendo volver a la última vez
Que a los ojos te miré
Y contarte las cosas que no te conté (te parece' a mi crush, jaja)
Y tirarte la' foto' que no te tiré (acho, jura'o te ves bien linda, déjame tirarte una foto)

Ey, tengo el pecho pela'o, me dio una matá'
El corazón dándome patá'
Dime, baby, ¿dónde tú está'?
Pa' llegarle con Roro, Julito, Cristal
Roy, Edgar, Seba, Óscar, Dalnelly, Big J, tocando batá
Hoy la calle la dejamo' 'esbaratá

Y sería cabrón que tú me toque' el güiro
Yo veo tu nombre y me salen suspiro'
No sé si son petardo' o si son tiro'
Mi blanquita, perico, mi kilo
Yo estoy en PR, tranquilo, pero

Debí tirar más fotos de cuando te tuve
Debí darte más beso' y abrazo' las vece' que pude
Ey, ojalá que los mío' nunca se muden
Y si hoy me emborracho, pues que me ayuden

Debí tirar más foto' de cuando te tuve
Debí darte más beso' y abrazo' las veces que pude
Ojalá que los mío' nunca se muden
Y si hoy me emborracho, pues que me ayuden

Ey, hoy voy a estar con abuelo to'l día, jugando dominó
Si me pregunta si aún pienso en ti, yo le digo que no
Que mi estadía cerquita de ti ya se terminó
Ya se terminó

Ey, que prendan la' máquina', voy pa' Santurce
Aquí todavía se da caña
Chequéate las babie', diablo, mami, qué dulce
Hoy yo quiero beber, beber, beber
Y hablar mierda hasta que me expulsen

'Toy bien loco ('toy bien loco), 'toy bien loco ('toy bien loco)
Cabrón, guía tú, que, hasta caminando, yo estoy que choco
'Toy bien loco ('toy bien loco), 'toy bien loco ('toy bien loco)
Vamo' a disfrutar, que nunca se sabe si nos queda poco
Debí tirar más f—

Gente, lo' quiero con cojone', los amo
Gracias por estar aquí, de verdad
Para mí, es bien importante que estén aquí
Cada uno de ustede' significa mucho para mí
Así que, vamo' pa' la foto, vengan pa'cá
Métase to'l mundo, to'l corillo, vamo'
Zumba

Ya Bernie tiene el nene y Jan, la nena'
Ya no estamo' pa' la movie' y las cadena'
'Tamos pa' las cosa' que valgan la pena
Ey, pa'l perreo, la salsa, la bomba y la plena
Chequéate la mía cómo es que suena

Debí tirar más fotos de cuando te tuve
Debí darte más besos y abrazo' las veces que pude
Ojalá que los mío' nunca se muden
Y que tú me envíe' más nude'
Y si hoy me emborracho, que Vero me ayude`).then(n => console.log(`🐰 Listo. ${n} mensajes enviados.`)).catch(console.error)
