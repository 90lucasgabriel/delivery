<?php
namespace CodeDelivery\Repositories;

use Prettus\Repository\Contracts\RepositoryInterface;

interface OrderRepository extends RepositoryInterface
{
    public function getByIdAndDeliveryman($orderId, $deliverymanId);
}
