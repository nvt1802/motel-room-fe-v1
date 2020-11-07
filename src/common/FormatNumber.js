
class FormatNumber {
    currencyformatter = new Intl.NumberFormat('vi-VN', {
        // style: 'currency',
        currency: 'VND',
    });
}

export default new FormatNumber()