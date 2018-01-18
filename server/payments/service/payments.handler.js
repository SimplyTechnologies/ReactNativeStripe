import stripeHelper from '../helpers/stripe';


export function payWithCard(req, res) {
    const { tokenId } = req.body;

    if(!tokenId) {
        res.status(400).json({msg: 'Token is required'});
    } else {
        stripeHelper.payWithCard(tokenId, 20)
            .then(charge => {
                res.status(200).json({msg: "The amount is paid successfully"});
            })
            .catch(err => {
                res.status(500).send(err.message);
            });
    }
}