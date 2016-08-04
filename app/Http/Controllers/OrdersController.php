<?php
namespace CodeDelivery\Http\Controllers;

use CodeDelivery\Repositories\OrderRepository;
use CodeDelivery\Repositories\UserRepository;
use Illuminate\Http\Request;

class OrdersController extends Controller{
	private $repository;
	private $userRepository;
	public function __construct(OrderRepository $repository, UserRepository $userRepository){
		$this->repository = $repository;
		$this->userRepository = $userRepository;
	}

	public function index(){
		$orders = $this->repository->paginate();
		return view('admin.orders.index', compact('orders'));
	}

	public function edit($id){
		$listStatus = [0=>'Pendente', 1=>'A caminho', 2=> 'Entregue'];
		$deliveryman = $this->userRepository->queryDeliveryman('name', 'id');
		$order = $this->repository->find($id);
		return view('admin.orders.edit', compact('order', 'listStatus', 'deliveryman'));	
	}

	public function update(Request $request, $id){
		$data = $request->all();
		$this->repository->update($data, $id);
		return redirect()->route('admin.orders.index');
	}
}