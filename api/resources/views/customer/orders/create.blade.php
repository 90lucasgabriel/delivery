@extends('app')
@section('content')
	<div class="container">
		<h3>Novo Cliente</h3>		
		@include('errors._check')
		{!! Form::open(['route'=>'customer.orders.store', 'class' => 'form']) !!}
			<label>Total: </label>
			<span id="total"></span><br />
			<a href="#" id="btnNewItem" class="btn btn-default">Novo Item</a><br /><br />
			<table class="table table-bordered">
				<thead>
					<tr>
						<th>Produto</th>
						<th>Quantidade</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<select name="items[0][product_id]" class="form-control">
								@foreach($products as $p)
									<option value="{{$p->id}}" data-price="{{$p->price}}">{{$p->name}} --- {{$p->price}}
								@endforeach
							</select>
						</td>
						<td>
							{!! Form::text('items[0][quantity]', 1, ['class'=>'form-control']) !!}
						</td>
					</tr>
				</tbody>
			</table>
			<div class="form-group">
				{!! Form::submit('Salvar', ['class' => 'btn btn-primary']) !!}
			</div>
		{!! Form::close() !!}
	</div>
@endsection

@section('post-script')
	<script>
		$('#btnNewItem').click(function(){
			var row 	= $('table tbody > tr:last');
			var newRow 	= row.clone();
			var length 	= $('table tbody tr').length;

			newRow.find('td').each(function(){
				var td  = $(this);
				var input = td.find('input,select');
				var name  = input.attr('name');

				input.attr('name', name.replace((length-1) + '', length + ''));
			});

			newRow.find('input').val(1);
			newRow.insertAfter(row);
			calculateTotal();
		});

		$(document.body).on('click', 'select', function(){
			calculateTotal();
		});

		$(document.body).on('blur', 'input', function(){
			calculateTotal();
		});

		function calculateTotal(){
			var total = 0;
			var trLen = $('table tbody tr').length;
			var tr = null, price, quantity;

			for(var i=0; i<trLen; i++){
				tr = $('table tbody tr').eq(i);
				price = tr.find(':selected').data('price');
				quantity = tr.find('input').val();
				total += price * quantity;
			}
			$('#total').html(total);
		}
	</script>
@endsection