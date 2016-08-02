@extends('app')
@section('content')
	<div class="container">
		<h3>Novo Cliente</h3>		
		@include('errors._check')
		{!! Form::open(['route' =>'admin.clients.store', 'class' => 'form']) !!}
			@include('admin.clients._form')	
			<div class="form-group">
				{!! Form::submit('Salvar', ['class' => 'btn btn-primary']) !!}
			</div>
		{!! Form::close() !!}
	</div>
@endsection