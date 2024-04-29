'use client'


export default function checkOut() {

    function checkOut(CartItems : any[], Drinks: any[], AddOns: any[],) {
        const cartItemNames = CartItems != null ? CartItems.map((item) => (item.name)) : [""];
        console.log(JSON.stringify({cartItemNames,Drinks,AddOns}))
        fetch('http://localhost:3000/new_order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({cartItemNames,Drinks,AddOns})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to send order');
            }
            else {
                localStorage.clear();
            }
            return response.json()
        })
        .then((data) => {
            //console.log(data)
            alert(data.orderId)
            localStorage.clear()
            
        });
    }
    
    return (
        <main>
            <button>
                {'<'} Back To Menu
            </button>
            
         </main>
    );
}