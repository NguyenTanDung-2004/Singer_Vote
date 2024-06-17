const { Web3 } = require('web3');
const Coin = require('../client/contract/singer_vote.json');
const web3 = new Web3('http://127.0.0.1:7545/');
const contract = new web3.eth.Contract(Coin.abi, '0xB169Dd2dB2d1fda0eAE3B336E8A10423A73fE2be');
const init = async() => {
    //7
    //await vote("0x7dC2cfa58Ec6191E904a1669815548b4263D633C", 30);
    var array = await get_list_singer_of_voter("0x1C506a4C5796DB79e40a7E150422392d4033D0Ca");
    console.log(array);
}
init();
// hàm này dùng để thêm singer.
async function add_singer(address_manager){
    await contract.methods.add_singer().send(
        {
            from: address_manager,
            gasLimit: 6721975
        }
    );
    console.log("add singer thanh cong");
}
// hàm này dùng để vote
async function vote(address_voter, id_singer){
    await contract.methods.vote(id_singer).send(
        {
            from: address_voter,
            gasLimit: 6721975
        }
    )
    .then(result =>{
        console.log("vote thanh cong");
    })
    .catch(error => {
        console.error("Error:", error); // Xử lý lỗi nếu có
    });
}
// hàm này dùng để lấy ra id_top3
async function get_id_top3(address_manager){
    await contract.methods.create_ID_top3().send(
        {
            from: address_manager,
            gasLimit: 6721975
        }
    )
    .then(result => {
        console.log("get_id thanh cong");
    })
    .catch(error => {
        console.error("Error:", error); // Xử lý lỗi nếu có
    });
    var array_id_top3 = contract.methods.get_id_top3().call(
        {
            from: address_manager,
            gasLimit: 6721975 
        }
    )
    return array_id_top3;
}
// hàm này để lấy ra list singer mà voter đã vote.
async function get_list_singer_of_voter(address_voter){
    var list_singer = contract.methods.get_list_singer_of_voter().call(
        {
            from: address_voter,
            gasLimit: 6721975 
        }
    )
    return list_singer;
}
// hàm này để kiểm tra xem là một người đã vote ca sĩ nào hay chưa, trả về false là vote rồi, true là chưa vote.
async function check_vote_1_singer(address_voter, id){
    return contract.methods.check_voter_voted_1_singer(id).call(
        {
            from: address_voter,
            gasLimit: 6721975 
        }
    )
}
// hàm này để remove 1 vote.
async function remove_1_vote(address_voter, id){
    await contract.methods.remove_1_vote(id).send(
        {
            from: address_voter,
            gasLimit: 6721975 
        }
    )
}
// hàm này để lấy ra số lượng vote của 1 ca sĩ.
async function get_number_vote_of_singer(){
    var number_votes = contract.methods.get_voted_number().call(
        {
            from: '0x7848a90b621f7916Cedb653D4551b0A9F723074A',
            gasLimit: 6721975 
        }
    )
    return number_votes;
}

