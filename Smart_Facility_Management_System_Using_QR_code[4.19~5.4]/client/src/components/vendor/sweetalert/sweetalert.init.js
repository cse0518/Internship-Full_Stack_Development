document.querySelector('.sweet-wrong').onclick = function(){
    sweetAlert("경고", "에러메세지", "error");
};
document.querySelector('.sweet-message').onclick = function(){
    swal("여기에 필요한 TEXT")
};
document.querySelector('.sweet-text').onclick = function(){
    swal("여기에", "필요한 Text")
};
document.querySelector('.sweet-success').onclick = function(){
    swal("성공", "OOO에 성공하였습니다.", "success")
};
document.querySelector('.sweet-confirm').onclick = function(){
    swal({
            title: "정말로 삭제하시겠습니까?",
            text: "한번 삭제한 자료는 복구할 수 없습니다.",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e74a3b",
            confirmButtonText: "삭제",
            closeOnConfirm: false
        },
        function(){
            swal("Deleted !!", "Hey, your imaginary file has been deleted !!", "success");
        });
};
document.querySelector('.sweet-success-cancel').onclick = function(){
    swal({
            title: "Are you sure to delete ?",
            text: "You will not be able to recover this imaginary file !!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#e74a3b",
            confirmButtonText: "삭제라고바꿀수있습니다.",
            cancelButtonText: "취소라고바꿀수있습니다",
            closeOnConfirm: false,
            closeOnCancel: false
        },
        function(isConfirm){
            if (isConfirm) {
                swal("삭제 !", "삭제되었습니당ㅎ", "success");
            }
            else {
                swal("취소 !!", "취소되었습니다", "error");
            }
        });
};
document.querySelector('.sweet-image-message').onclick = function(){
    swal({
        title: "이미지",
        text: "이미지 URL을 init.js에 넣어주세요",
        imageUrl: "images/hand.jpg"
    });
};
document.querySelector('.sweet-html').onclick = function(){
    swal({
        title: "HTML ",
        text: "<span class='text-critical'><i class='pr-2 fab fa-font-awesome'></i>HTML 넣는 곳 <span>",
        html: true
    });
};
document.querySelector('.sweet-auto').onclick = function(){
    swal({
        title: "자동으로 닫힘",
        text: "2초후 닫힘",
        timer: 2000,
        showConfirmButton: false
    });
};
document.querySelector('.sweet-prompt').onclick = function(){
    swal({
            title: "Enter an input !!",
            text: "Write something interesting !!",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "Write something"
        },
        function(inputValue){
            if (inputValue === false) return false;
            if (inputValue === "") {
                swal.showInputError("You need to write something!");
                return false
            }
            swal("Hey !!", "You wrote: " + inputValue, "success");
        });
};
document.querySelector('.sweet-ajax').onclick = function(){
    swal({
            title: "Sweet ajax request !!",
            text: "Submit to run ajax request !!",
            type: "info",
            showCancelButton: true,
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
        },
        function(){
            setTimeout(function(){
                swal("Hey, your ajax request finished !!");
            }, 2000);
        });
};
