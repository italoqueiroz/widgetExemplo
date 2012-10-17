$(function() {
  $.widget("custom.list", {
    // default options
    options: {
      data: [],
      columns: ['nome', 'idade']  
    },

    htmlTable: null,

    //Construtor
    _create: function() {
      console.log('construtor');
      this.element.addClass('custom-list');
      this._refresh();
    },

    //Este método é chamada assim que for criado e quando for alterada as opções.
    _refresh: function() {
      //verifica se foi informado os dados.
      if (this.options.data.length) {
        this._createTable();
        this._createHeaderTable();
        this._createBodyTable();
      } else {
        $('<div>', {id:"custon-list-alert", text:"Não existem registros"})
          .appendTo(this.element);
      }
    },

    //Método privado que cria a tabela
    _createTable: function () {
      this.element.html('<table>');
    },

    //Método privado que cria o cabeçalho
    _createHeaderTable: function () {
      var headerTable = $('<thead>');

      $('<tr>').appendTo(headerTable);
      $.each(this.options.columns, function(key, column){
        $('<th>', {text:column, class:'ui-widget-header'}).appendTo(headerTable.find('tr'));
      });
      
      this.element.find('table').html(headerTable);
    },

    //Método privado que monta o corpo da tabela com os dados passados.
    _createBodyTable: function () {
      var bodyTable = $('<tbody>'),
      self = this;

      $.each(self.options.data, function(key, data){
        $('<tr>').appendTo(bodyTable);
        $.each(self.options.columns, function(i, column){
          $('<td>', {text:data[column]?data[column]:'', class:'ui-state-default'}).appendTo(bodyTable.find('tr:last-child'));
        }); 
      });

      this.element.find('table').append(bodyTable);
    },
    
    //Responsável por remover o plugin e fazer as limpezas necessárias.
    _destroy: function() {
      this.element.find('table').remove();
      this.element.removeClass('custom-list');
    },

    // Este método é chamado sempre que uma opção é alterada
    // e toda vez que uma opção é alterada atualizamos nosso widget.
    _setOptions: function() {
      // _super and _superApply continuam a manipulação correta dos argumentos passados.
      this._superApply( arguments );
      this._refresh();
    }
  });
});