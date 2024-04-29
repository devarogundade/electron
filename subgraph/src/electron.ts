import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  CloseLoan as CloseLoanEvent,
  ClosePosition as ClosePositionEvent,
  NewLoan as NewLoanEvent,
  NewPool as NewPoolEvent,
  NewPosition as NewPositionEvent,
  OwnershipTransferStarted as OwnershipTransferStartedEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/Electron/Electron";
import {
  NewLoan,
  NewPool,
  NewPosition,
  OwnershipTransferStarted,
  OwnershipTransferred
} from "../generated/schema";

export function handleCloseLoan(event: CloseLoanEvent): void {
  let entity = NewLoan.load(
    event.params.account.toHexString().concat(event.params.poolId.toString())
  );

  if (!entity) return;

  entity.state = event.params.state;
  entity.repaidDate = event.params.repaidDate;

  entity.save();

  let pool = NewPool.load(
    event.params.poolId.toString()
  );

  if (!pool || pool.totalBorrowed < entity.principal) return;

  pool.totalBorrowed = pool.totalBorrowed.minus(entity.principal);

  pool.save();
}

export function handleClosePosition(event: ClosePositionEvent): void {
  let entity = NewPosition.load(
    event.params.account.toHexString().concat(event.params.poolId.toString())
  );

  if (!entity) return;

  entity.poolId = BigInt.zero();
  entity.account = Bytes.empty();

  entity.save();

  let pool = NewPool.load(
    event.params.poolId.toString()
  );

  if (!pool || pool.totalSupplied < entity.collateral) return;

  pool.totalSupplied = pool.totalSupplied.minus(entity.collateral);

  pool.save();
}

export function handleNewLoan(event: NewLoanEvent): void {
  let entity = new NewLoan(
    event.params.account.toHexString().concat(event.params.poolId.toString())
  );

  entity.poolId = event.params.poolId;
  entity.account = event.params.account;
  entity.principal = event.params.principal;
  entity.collateral = event.params.collateral;
  entity.state = event.params.state;
  entity.startDate = event.params.startDate;
  entity.repaidDate = BigInt.zero();

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let pool = NewPool.load(
    event.params.poolId.toString()
  );

  if (!pool) return;

  pool.totalBorrowed = pool.totalBorrowed.plus(event.params.principal);

  pool.save();
}

export function handleNewPool(event: NewPoolEvent): void {
  let entity = new NewPool(
    event.params.poolId.toString()
  );

  entity.poolId = event.params.poolId;
  entity.principalId = event.params.principalId;
  entity.collateralId = event.params.collateralId;
  entity.totalSupplied = event.params.totalSupplied;
  entity.totalBorrowed = event.params.totalBorrowed;
  entity.interest = event.params.interest;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleNewPosition(event: NewPositionEvent): void {
  let entity = new NewPosition(
    event.params.account.toHexString().concat(event.params.poolId.toString())
  );

  entity.poolId = event.params.poolId;
  entity.account = event.params.account;
  entity.collateral = event.params.collateral;
  entity.startDate = event.params.startDate;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  let pool = NewPool.load(
    event.params.poolId.toString()
  );

  if (!pool) return;

  pool.totalSupplied = pool.totalSupplied.plus(event.params.collateral);

  pool.save();
}

export function handleOwnershipTransferStarted(
  event: OwnershipTransferStartedEvent
): void {
  let entity = new OwnershipTransferStarted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.previousOwner = event.params.previousOwner;
  entity.newOwner = event.params.newOwner;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
}
