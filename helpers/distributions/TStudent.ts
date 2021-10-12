function LogGamma(Z: number) {
    const S = 1 + 76.18009173 / Z - 86.50532033 / (Z + 1) + 24.01409822 / (Z + 2) - 1.231739516 / (Z + 3) + 0.00120858003 / (Z + 4) - 0.00000536382 / (Z + 5);
    const LG = (Z - 0.5) * Math.log(Z + 4.5) - (Z + 4.5) + Math.log(S * 2.50662827465);
    return LG;
}

function Betinc(X: number, A: number, B: number) {
    let A0 = 0;
    let B0 = 1;
    let A1 = 1;
    let B1 = 1;
    let M9 = 0;
    let A2 = 0;
    let C9;
    while (Math.abs((A1 - A2) / A1) > 0.00001) {
        A2 = A1;
        C9 = -(A + M9) * (A + B + M9) * X / (A + 2 * M9) / (A + 2 * M9 + 1);
        A0 = A1 + C9 * A0;
        B0 = B1 + C9 * B0;
        M9 += 1;
        C9 = M9 * (B - M9) * X / (A + 2 * M9 - 1) / (A + 2 * M9);
        A1 = A0 + C9 * A1;
        B1 = B0 + C9 * B1;
        A0 /= B1;
        B0 /= B1;
        A1 /= B1;
        B1 = 1;
    }
    return A1 / A;
}

export function computeTStudent(X: number, df: number) {
    let betacdf = 0;
    let tcdf = 0;

    const A = df / 2;
    const S = A + 0.5;
    const Z = df / (df + X * X);
    const BT = Math.exp(LogGamma(S) - LogGamma(0.5) - LogGamma(A) + A * Math.log(Z) + 0.5 * Math.log(1 - Z));
    if (Z < (A + 1) / (S + 2)) {
        betacdf = BT * Betinc(Z, A, 0.5);
    } else {
        betacdf = 1 - BT * Betinc(1 - Z, 0.5, A);
    }
    if (X < 0) {
        tcdf = betacdf / 2;
    } else {
        tcdf = 1 - betacdf / 2;
    }

    tcdf = Math.round(tcdf * 100000) / 100000;
    return tcdf;
}
