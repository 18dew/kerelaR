import store from '../../store'
import Web3 from 'web3'

export const WEB3_INITIALIZED = 'WEB3_INITIALIZED'
function web3Initialized(results) {
  return {
    type: WEB3_INITIALIZED,
    payload: results
  }
}

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function(dispatch) {
    var results
    var web3

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
      // Use Mist/MetaMask's provider.
      web3 = new Web3(web3.currentProvider)

      results = {
        web3Instance: web3
      }
      
      console.log('Injected web3 detected.');

      resolve(store.dispatch(web3Initialized(results)))
    } else {

      // Fallback to localhost if no web3 injection.
      var provider = new Web3.providers.HttpProvider('https://rinkeby.infura.io/AEvsZBr9Up0h6PjviJRD')
      web3 = new Web3(provider)
      results = {
        web3Instance: web3
      }
      var pvk = "0xE492164A9FE6E9D4A3E4FD595D8D2ABE1DC0E1B35C4476C850FD5C4A516D1BDF";
      web3.eth.accounts.wallet.add(pvk);
      console.log(web3);
      window.web3 = web3;

      console.log('No web3 instance injected, using Local web3.asda');
      resolve(store.dispatch(web3Initialized(results)))
    }

    // TODO: Error checking.
  })
})

export default getWeb3
