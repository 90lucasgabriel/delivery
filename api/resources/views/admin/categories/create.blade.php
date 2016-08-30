@extends('app')
@section('content')
	<div class="container">
		<h3>Nova Categoria</h3>
		@include('errors._check')

		{!! Form::open(['route' => 'admin.categories.store', 'class' => 'form']) !!}
			@include('admin.categories._form')
			<div class="form-group">
				{!! Form::submit('Criar', ['class' => 'btn btn-primary']) !!}
			</div>
		{!! Form::close() !!}
	</div>
@endsection
