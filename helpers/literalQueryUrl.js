const literalQueryUrl = (req) =>{
    const urlImage = () => `${req.protocol}://${req.get("host")}/product/image/`

    [literal(`CONCAT('${req.protocol}://${req.get("host")}/product/image/', avatar)`),
    'avatar' ]
}
    