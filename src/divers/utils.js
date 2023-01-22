export const formatageMonetaire = (montant) => {
    return (Math.round(montant * 100) / 100).toFixed(2) + " €"
}