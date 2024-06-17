pragma solidity >=0.4.22 <0.9.0;

contract singer_vote {
    address public manager;

    mapping(uint => uint) public singer_votedNumber;
    mapping(address => uint[]) public voter_ListSinger;
    uint[] public id_singer;
    uint[] public voted_number;
    uint[] public id_top3;
    constructor() public{
        manager = msg.sender;
    }
    function get_voted_number() public returns (uint[] memory){
        require (msg.sender == manager);
        return voted_number;
    }
    function get_id_top3() public returns (uint[] memory){
        require (msg.sender == manager);
        return id_top3;
    }
    function get_id_singer() public returns (uint[] memory){
        require (msg.sender == manager);
        return id_singer;
    }
    function add_singer() public {
        require(msg.sender == manager, "Only manager can add singer");
        singer_votedNumber[id_singer.length] = 0; 
        id_singer.push(id_singer.length);
        voted_number.push(0);
    }

    function get_list_singer_of_voter() public view returns(uint[] memory) {
        return voter_ListSinger[msg.sender];
    }

    function check_voter_voted_1_singer(uint id) public view returns(bool) {
        uint[] memory list_singer = get_list_singer_of_voter();
        for (uint i = 0; i < list_singer.length; i++){
            if (list_singer[i] == id){
                return false;
            }
        }
        return true;
    }

    function get_number_singer_of_voter() public view returns(uint) {
        return voter_ListSinger[msg.sender].length;
    }

    function check_number_singer_of_voter() public view returns(bool) {
        return get_number_singer_of_voter() < 5;
    }

    function create_ID_top3() public {
        require(msg.sender == manager, "Only manager can create top 3 list");
        id_top3 = new uint[](0);
        uint[] memory copy_id_singer = coppy_Array(id_singer);
        uint[] memory copy_voted_number = coppy_Array(voted_number);
        for (uint i = 0; i < copy_voted_number.length; i++){
            for (uint j = 0; j < copy_voted_number.length; j++){
                if (copy_voted_number[i] > copy_voted_number[j]){
                    uint vote_temp = copy_voted_number[i];
                    copy_voted_number[i] = copy_voted_number[j];
                    copy_voted_number[j] = vote_temp;
                    uint id_temp = copy_id_singer[i];
                    copy_id_singer[i] = copy_id_singer[j];
                    copy_id_singer[j] = id_temp;
                }
            }
        }
        uint count;
        for (uint i = 0; i < copy_id_singer.length; i++){
            id_top3.push(copy_id_singer[i]);
            if (copy_voted_number[i + 1] < copy_voted_number[i]){
                count++;
            }
            if (count == 3){
                return;
            }
        }
    }

    function coppy_Array(uint[] memory Array) public pure returns(uint[] memory) {
        uint[] memory coppyArray = new uint[](Array.length);
        for (uint i = 0; i < Array.length; i++){
            coppyArray[i] = Array[i];
        }
        return coppyArray;
    }

    function vote(uint id) public {
        require(check_voter_voted_1_singer(id), "Voter already voted for this singer");
        require(check_number_singer_of_voter(), "Voter already voted for 5 singers");
        singer_votedNumber[id]++;
        voted_number[id]++;
        voter_ListSinger[msg.sender].push(id);
    }

    function get_index_singer_in_voter_ListSinger(uint id) public view returns(uint) {
        uint[] memory voterSingers = voter_ListSinger[msg.sender];
        for (uint i = 0; i < voterSingers.length; i++){
            if (voterSingers[i] == id){
                return i;
            }
        }
        revert("Singer not found in voter's list");
    }

    function move_to_end_Array(uint index) private {
        uint[] storage voterSingers = voter_ListSinger[msg.sender];
        for (uint i = index; i < voterSingers.length - 1; i++){
            voterSingers[i] = voterSingers[i + 1];
        }
    }

    function remove_1_vote(uint id) public {
        uint index = get_index_singer_in_voter_ListSinger(id);
        move_to_end_Array(index);
        voter_ListSinger[msg.sender].pop();
        voted_number[id]--;
    }
}
