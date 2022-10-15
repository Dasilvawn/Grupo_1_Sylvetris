const formatPrice = ( value) => {

    // Crear formateador
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
    //lo pasamos de euros a pesos
    return formatter.format( value ) ; //$2,500.00
}

module.exports ={
    formatPrice
}