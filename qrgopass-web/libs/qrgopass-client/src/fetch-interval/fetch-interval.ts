export const TOO_MANY_LOOPS = "TOO_MANY_LOOPS";

export const fetchInterval = (
    callback: () => Promise<{ done: false } | { done: true, result: any }>,
    maxIterations: number,
    delay: number) => {
    let loopCount = 0;

    return new Promise<any>((resolve, reject) => {
        const fetchLoop = async () => {
            loopCount++;

            const result = await callback();

            if (result.done === false) {
                if (loopCount < maxIterations) {
                    setTimeout(fetchLoop, delay);
                } else {
                    reject(TOO_MANY_LOOPS);
                }
            } else {
                resolve(result.result);
            }
        }
        setTimeout(fetchLoop, delay);
    });
}