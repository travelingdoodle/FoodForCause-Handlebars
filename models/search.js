$("#search-btn").on("click", function(event) {
    event.preventDefault();
  
    var itemSearched = $("#item-search").val().trim();
  
    $.get("/api/" + itemSearched, function(data) {
      console.log(data);
      renderItem(data);
  
    });
  });
  