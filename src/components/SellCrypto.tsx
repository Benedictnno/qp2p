
function SellCrypto() {
  return (
    <div >
      <div className="mb-4">
        <label>I want to sell</label>
        <select
        //   value={crypto}
          name="crypto"
        //   onChange={handleInputChange}
          className="block w-full px-4 py-2 border rounded-lg"
        >
          <option value="TON">Toncoin (TON)</option>
          <option value="USDT">Tether (USDT)</option>
        </select>
      </div>
    </div>
  );
}

export default SellCrypto