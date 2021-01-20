export function waitForInjected(
    extension: string,
    seconds: number
): Promise<any> {
    return new Promise((resolve) => {
        const max = (seconds * 1000) / 250;
        let tries = 0;
        const check = () => {
            tries++;
            if (tries >= max) {
                resolve(false);
                return;
            }
            if (!window[extension]) setTimeout(check, 250);
            else resolve(window[extension]);
        };
        check();
    });
}
