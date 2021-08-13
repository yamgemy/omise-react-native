# omise-react-native

Original repo: https://github.com/keeratita/omise-react-native

## Install

```sh
$ yarn add https://github.com/tnylee/omise-react-native.git
```

## Setup

```
import Omise from 'omise-react-native';
Omise.config('pkey_test_...', 'skey_test_...', '2017-11-12');
```

## Usage
### Create a token
```
const data = await Omise.createToken({
    card: {
        name: 'JOHN DOE',
        city: 'Bangkok',
        postal_code: 10320,
        number: '4242424242424242',
        expiration_month: 10,
        expiration_year: 2018,
        security_code: 123
    }
});

console.log('data', JSON.stringify(data));
```

### Create a source
```
const data = await Omise.createSource(
    type: 'internet_banking_bbl',
    amount: 500000,
    currency: 'thb'
});

console.log('data', JSON.stringify(data));
```

### Create a charge
```
const data = await Omise.createCharge(
    description: 'some description',
    amount: 500000, // 5,000 baht
    currency: 'thb',
    capture: true,
    card: omiseTokenId
});

if (data.paid) // success
console.log('data', JSON.stringify(data));
```