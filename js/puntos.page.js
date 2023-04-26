

let $tabmenu = $("#tab-menu"),
    $indicador = $("#tab-menu").find(".indicador")
;

$tabmenu.on("click", "> div", function(e){
    let $items = $tabmenu.find("> div:not(.indicador)").removeClass("active"),
        $this = $(e.currentTarget),
        $tabs = $tabmenu.parent().find(".tabs"),
        index = $items.index($this),
        $tabCont = $("#tabs-cont")
    ;
    $this.addClass("active")
    $indicador.width($this.width() + 6)
    $indicador.css("transform", `translateX(${$this.position().left - 3}px)`)
    $tabs.not($tabs.eq(index)).removeClass("fade-in").addClass("fade-out")
    $tabs.eq(index).css({display: "block"}).removeClass("fade-out").addClass("fade-in")
    $tabCont.height($tabs.eq(index).height())
});

setTimeout(e => $tabmenu.find("> div").eq(0).trigger("click"), 200)

