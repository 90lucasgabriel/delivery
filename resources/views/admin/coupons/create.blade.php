@extends('app')
@section('content')
	<div class="container">
		<h3>Novo Cupom</h3>		
		@include('errors._check')
		{!! Form::open(['route' =>'admin.coupons.store', 'class' => 'form']) !!}
			@include('admin.coupons._form')	
			<div class="form-group">
				{!! Form::submit('Salvar', ['class' => 'btn btn-primary']) !!}
			</div>
		{!! Form::close() !!}
	</div>
@endsection