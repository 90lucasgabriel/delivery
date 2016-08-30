@extends('app')
@section('content')
	<div class="container">
		<h2>Pedido: #{{$order->id}} - R$ {{$order->total}}</h3>		
		<h4>Cliente: {{$order->client->user->name}}</h3>		
		<h4>Data: {{$order->created_at}}</h4>
		
		<p>
			<b>Endereço: </b>			<br />
			{{$order->client->address}} <br /> 
			{{$order->client->city}} - {{$order->client->state}} <br />
			{{$order->client->zipcode}}
		</p>

		{!! Form::model($order, ['route' => ['admin.orders.update', $order-> id], 'class' => 'form']) !!}
			<div class="form-group">
				{!! Form::label('Status', 'Status:') !!}
				{!! Form::select('status', $listStatus, null, ['class' => 'form-control']) !!}
			</div>
			<div class="form-group">
				{!! Form::label('Deliveryman', 'Entregador:') !!}
				{!! Form::select('user_deliveryman_id', $deliveryman, null, ['class' => 'form-control']) !!}
			</div>
			<div class="form-group">
				{!! Form::submit('Salvar', ['class' => 'btn btn-primary']) !!}
			</div>
		{!! Form::close() !!}
	</div>
@endsection